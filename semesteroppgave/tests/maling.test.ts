import { describe, it, expect } from "vitest";
import { buildDisplayList } from "../src/maling.js";
import type {
  LayoutBox,
  Dimensions,
  StyledNode,
  Color,
  Keyword,
  Length,
  DisplayCommand,
} from "../src/typer.js";
import { createElement } from "../src/dom.js";

// --- Hjelpefunksjoner ---

function keyword(value: string): Keyword {
  return { type: "keyword", value };
}

function length(value: number): Length {
  return { type: "length", value, unit: "px" };
}

function color(r: number, g: number, b: number, a: number = 255): Color {
  return { type: "color", r, g, b, a };
}

function zeroDimensions(): Dimensions {
  return {
    content: { x: 0, y: 0, width: 0, height: 0 },
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
    border: { left: 0, right: 0, top: 0, bottom: 0 },
    margin: { left: 0, right: 0, top: 0, bottom: 0 },
  };
}

function makeLayoutBox(
  overrides: Partial<{
    x: number;
    y: number;
    width: number;
    height: number;
    background: Color;
    borderColor: Color;
    borderWidth: number;
    children: LayoutBox[];
  }> = {}
): LayoutBox {
  const dims = zeroDimensions();
  dims.content.x = overrides.x ?? 0;
  dims.content.y = overrides.y ?? 0;
  dims.content.width = overrides.width ?? 100;
  dims.content.height = overrides.height ?? 50;

  if (overrides.borderWidth) {
    dims.border.left = overrides.borderWidth;
    dims.border.right = overrides.borderWidth;
    dims.border.top = overrides.borderWidth;
    dims.border.bottom = overrides.borderWidth;
  }

  const values = new Map<string, any>();
  if (overrides.background) {
    values.set("background", overrides.background);
  }
  if (overrides.borderColor) {
    values.set("border-color", overrides.borderColor);
  }

  const styledNode: StyledNode = {
    node: createElement("div", new Map(), []),
    specifiedValues: values,
    children: [],
  };

  return {
    dimensions: dims,
    boxType: "block",
    styledNode,
    children: overrides.children ?? [],
  };
}

describe("Maling", () => {
  describe("buildDisplayList", () => {
    it("skal returnere tom liste for boks uten stiler", () => {
      const box = makeLayoutBox();
      box.styledNode!.specifiedValues = new Map();
      const commands = buildDisplayList(box);
      expect(commands).toHaveLength(0);
    });

    it("skal generere en SolidColor-kommando for bakgrunn", () => {
      const bg = color(100, 150, 200);
      const box = makeLayoutBox({
        x: 10,
        y: 20,
        width: 200,
        height: 100,
        background: bg,
      });

      const commands = buildDisplayList(box);
      const bgCommand = commands.find(
        (cmd) =>
          cmd.type === "solid" &&
          cmd.color.r === 100 &&
          cmd.color.g === 150 &&
          cmd.color.b === 200
      );
      expect(bgCommand).toBeDefined();
      expect(bgCommand!.rect).toEqual({
        x: 10,
        y: 20,
        width: 200,
        height: 100,
      });
    });

    it("skal generere border-kommandoer", () => {
      const borderCol = color(0, 0, 0);
      const box = makeLayoutBox({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
        borderColor: borderCol,
        borderWidth: 2,
      });

      const commands = buildDisplayList(box);
      // Bør ha minst 4 border-rektangler (topp, bunn, venstre, høyre)
      const borderCommands = commands.filter(
        (cmd) =>
          cmd.type === "solid" &&
          cmd.color.r === 0 &&
          cmd.color.g === 0 &&
          cmd.color.b === 0
      );
      expect(borderCommands.length).toBeGreaterThanOrEqual(4);
    });

    it("skal prosessere barn rekursivt", () => {
      const childBg = color(255, 0, 0);
      const child = makeLayoutBox({
        x: 0,
        y: 0,
        width: 50,
        height: 25,
        background: childBg,
      });

      const parentBg = color(0, 0, 255);
      const parent = makeLayoutBox({
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        background: parentBg,
        children: [child],
      });

      const commands = buildDisplayList(parent);
      // Skal inneholde kommandoer for både forelder og barn
      const blueCommands = commands.filter(
        (cmd) => cmd.type === "solid" && cmd.color.b === 255 && cmd.color.r === 0
      );
      const redCommands = commands.filter(
        (cmd) => cmd.type === "solid" && cmd.color.r === 255 && cmd.color.b === 0
      );
      expect(blueCommands.length).toBeGreaterThanOrEqual(1);
      expect(redCommands.length).toBeGreaterThanOrEqual(1);
    });

    it("skal tegne forelder før barn (maler-algoritmen)", () => {
      const childBg = color(255, 0, 0);
      const child = makeLayoutBox({
        background: childBg,
      });

      const parentBg = color(0, 0, 255);
      const parent = makeLayoutBox({
        background: parentBg,
        children: [child],
      });

      const commands = buildDisplayList(parent);
      // Forelderens bakgrunn skal komme FØR barnets
      const parentIdx = commands.findIndex(
        (cmd) => cmd.type === "solid" && cmd.color.b === 255 && cmd.color.r === 0
      );
      const childIdx = commands.findIndex(
        (cmd) => cmd.type === "solid" && cmd.color.r === 255 && cmd.color.b === 0
      );
      expect(parentIdx).toBeLessThan(childIdx);
    });

    it("skal håndtere boks uten styledNode", () => {
      const box: LayoutBox = {
        dimensions: zeroDimensions(),
        boxType: "anonymous",
        children: [],
      };
      const commands = buildDisplayList(box);
      expect(commands).toHaveLength(0);
    });
  });
});
