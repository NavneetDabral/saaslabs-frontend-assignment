import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./index";

vi.mock("../../utility/useIsMobile", () => ({
  useIsMobile: vi.fn(),
}));

describe("Pagination Component", () => {
  it("renders correct number of pages when totalPages <= 6", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />
    );

    for (let i = 1; i <= 5; i++) {
      await expect.element(page.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("renders condensed pagination when totalPages > 6 and currentPage is at the start", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination totalPages={10} currentPage={1} onPageChange={onPageChange} />
    );

    await expect.element(page.getByText("...")).toBeInTheDocument();
    await expect.element(page.getByText("10")).toBeInTheDocument();
  });

  it("renders condensed pagination when totalPages > 6 and currentPage is at the end", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination totalPages={10} currentPage={9} onPageChange={onPageChange} />
    );

    await expect.element(page.getByText("...")).toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "1", exact: true }))
      .toBeInTheDocument();
  });

  it("disables previous and first buttons on first page", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination totalPages={10} currentPage={1} onPageChange={onPageChange} />
    );

    await expect
      .element(page.getByRole("button", { name: "<<" }))
      .toBeDisabled();
    await expect
      .element(page.getByRole("button", { name: "<", exact: true }))
      .toBeDisabled();
  });

  it("disables next and last buttons on last page", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        totalPages={10}
        currentPage={10}
        onPageChange={onPageChange}
      />
    );

    await expect.element(page.getByText(">>")).toBeDisabled();
  });
});
