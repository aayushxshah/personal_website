import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ExplorerPage from "./ExplorerPage";

vi.mock("@/components/AsciiSculpture", () => ({ default: () => <div data-testid="ascii-sculpture" /> }));

describe("Explorer homepage", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
    window.localStorage.clear();
  });

  it("opens files from Explorer and switches between tabs", () => {
    render(<ExplorerPage />);
    expect(screen.getByText("— aayushah.com")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /skills\.json/i }));
    expect(screen.getByRole("tabpanel", { name: "skills.json" })).toHaveTextContent("Python");
    expect(screen.getByRole("tab", { name: /README\.md/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /README\.md/i }));
    expect(screen.getByRole("tabpanel", { name: "README.md" })).toHaveTextContent("working");
  });

  it("treats experience as a folder and each company as a file", () => {
    render(<ExplorerPage />);
    const explorer = within(screen.getByRole("complementary", { name: "File explorer" }));
    fireEvent.click(screen.getByRole("button", { name: "Collapse experience folder" }));
    expect(explorer.queryByRole("button", { name: /ciroos\.md/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /experience\// })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Expand experience folder" }));
    fireEvent.click(explorer.getByRole("button", { name: /ciroos\.md/ }));
    expect(screen.getByRole("tabpanel", { name: "ciroos.md" })).toHaveTextContent("Ciroos");
    expect(screen.getByRole("tab", { name: /ciroos\.md/ })).toBeInTheDocument();
  });

  it("falls back to README for the removed signal page", () => {
    window.history.replaceState(null, "", "/#signal");
    render(<ExplorerPage />);
    expect(screen.getByRole("tabpanel", { name: "README.md" })).toBeInTheDocument();
    expect(screen.queryByText("signal.shader")).not.toBeInTheDocument();
    expect(screen.queryByText("TERMINAL")).not.toBeInTheDocument();
  });

  it("finds a file through the activity bar search", () => {
    render(<ExplorerPage />);
    fireEvent.click(screen.getByRole("button", { name: "Search files" }));
    fireEvent.change(screen.getByPlaceholderText("Search files"), { target: { value: "cisco" } });
    fireEvent.click(screen.getByRole("button", { name: /cisco\.md/ }));
    expect(screen.getByRole("tabpanel", { name: "cisco.md" })).toHaveTextContent("Cisco");
  });

  it("opens a company file from its URL", () => {
    window.history.replaceState(null, "", "/#berkeleytime");
    render(<ExplorerPage />);
    expect(screen.getByRole("tabpanel", { name: "berkeleytime.md" })).toHaveTextContent("Berkeleytime");
  });

  it("resizes and collapses the desktop Explorer", () => {
    render(<ExplorerPage />);
    const separator = screen.getByRole("separator", { name: "Resize Explorer" });
    fireEvent.keyDown(separator, { key: "ArrowRight" });
    expect(separator).toHaveAttribute("aria-valuenow", "265");
    Object.defineProperty(separator, "setPointerCapture", { value: vi.fn() });
    Object.defineProperty(separator, "hasPointerCapture", { value: () => false });
    fireEvent(separator, new MouseEvent("pointerdown", { bubbles: true, clientX: 100 }));
    fireEvent(separator, new MouseEvent("pointermove", { bubbles: true, clientX: 140 }));
    expect(separator).toHaveAttribute("aria-valuenow", "305");
    fireEvent(separator, new MouseEvent("pointerup", { bubbles: true }));
    fireEvent.click(screen.getByRole("button", { name: "Collapse Explorer" }));
    expect(screen.getByRole("main").querySelector("aside.explorer-sidebar")).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(screen.getByRole("button", { name: "Explorer" }));
    expect(screen.getByRole("complementary", { name: "File explorer" })).toHaveAttribute("aria-hidden", "false");
  });

  it("shows one scrolling portfolio on a narrow screen", () => {
    const media = vi.spyOn(window, "matchMedia").mockImplementation(query => ({
      matches: query.includes("max-width"), media: query, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    } as unknown as MediaQueryList));
    render(<ExplorerPage />);
    expect(screen.getByRole("link", { name: "~/aayushah.com" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    media.mockRestore();
  });
});
