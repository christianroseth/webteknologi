// ============================================================
// typer.ts — Alle typer og interfaces for browser-engine-prosjektet
// Denne filen er FERDIG LEVERT. Du skal IKKE endre den.
// ============================================================

// --- DOM-typer ---

/** En DOM-nodes type er enten et element (med tagnavn og attributter) eller en tekststreng. */
export type NodeType = ElementData | string;

/** En node i DOM-treet. Kan ha barn-noder. */
export interface DomNode {
  children: DomNode[];
  nodeType: NodeType;
}

/** Data for en element-node: tagnavn og attributter. */
export interface ElementData {
  tagName: string;
  attributes: Map<string, string>;
}

// --- CSS-typer ---

/** Et komplett stilark bestående av regler. */
export interface Stylesheet {
  rules: Rule[];
}

/** En CSS-regel: én eller flere selektorer + deklarasjoner. */
export interface Rule {
  selectors: Selector[];
  declarations: Declaration[];
}

/** En enkel selektor (støtter tag, id, klasser). */
export interface Selector {
  tagName?: string;
  id?: string;
  classes: string[];
}

/** En CSS-deklarasjon: et egenskap–verdi-par (f.eks. color: red). */
export interface Declaration {
  name: string;
  value: Value;
}

/** En CSS-verdi kan være et nøkkelord, en lengde (px), eller en farge. */
export type Value = Keyword | Length | Color;

/** Et CSS-nøkkelord (f.eks. "block", "none", "auto"). */
export interface Keyword {
  type: "keyword";
  value: string;
}

/** En CSS-lengdeverdi med enhet (kun px støttes). */
export interface Length {
  type: "length";
  value: number;
  unit: "px";
}

/** En CSS-farge (RGBA). */
export interface Color {
  type: "color";
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Spesifisitet som trippel: [id-count, class-count, tag-count]. */
export type Specificity = [number, number, number];

// --- Style tree ---

/** En node i style-treet: en DOM-node med tilknyttede CSS-verdier. */
export interface StyledNode {
  node: DomNode;
  specifiedValues: Map<string, Value>;
  children: StyledNode[];
}

/** En matchet regel med sin spesifisitet — brukes for sortering. */
export interface MatchedRule {
  specificity: Specificity;
  rule: Rule;
}

// --- Layout ---

/** Dimensjonene til en layout-boks: innhold + padding + border + margin. */
export interface Dimensions {
  content: Rect;
  padding: EdgeSizes;
  border: EdgeSizes;
  margin: EdgeSizes;
}

/** Et rektangel med posisjon og størrelse. */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Kantbredder for padding, border eller margin. */
export interface EdgeSizes {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Typen boks: block, inline eller anonym (wrapper). */
export type BoxType = "block" | "inline" | "anonymous";

/** En boks i layout-treet med dimensjoner, type og eventuelle barn. */
export interface LayoutBox {
  dimensions: Dimensions;
  boxType: BoxType;
  styledNode?: StyledNode;
  children: LayoutBox[];
}

// --- Maling (painting) ---

/** En tegnekommando i display-listen. */
export type DisplayCommand = SolidColor;

/** Tegn et fylt rektangel med en gitt farge. */
export interface SolidColor {
  type: "solid";
  color: Color;
  rect: Rect;
}

// --- Hjelpefunksjoner for typer ---

/** Opprett et tomt Dimensions-objekt med alle verdier satt til 0. */
export function zeroDimensions(): Dimensions {
  return {
    content: { x: 0, y: 0, width: 0, height: 0 },
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
    border: { left: 0, right: 0, top: 0, bottom: 0 },
    margin: { left: 0, right: 0, top: 0, bottom: 0 },
  };
}
