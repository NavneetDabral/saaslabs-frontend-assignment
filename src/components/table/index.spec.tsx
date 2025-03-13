import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import { describe, it, expect, vi } from "vitest";
import Table from "./index";

vi.mock("../../utility/useIsMobile", () => ({
  useIsMobile: vi.fn(),
}));

describe("Table Component", () => {
  const columns: { key: "id" | "name"; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
  ];
  const data = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  it("renders table headers correctly", async () => {
    render(
      <Table
        data={data}
        columns={columns}
        handlePageChange={vi.fn()}
        currentPage={1}
        totalPages={1}
      />
    );

    await expect.element(page.getByText("ID")).toBeInTheDocument();
    await expect.element(page.getByText("Name")).toBeInTheDocument();
  });

  it("renders table rows correctly", async () => {
    render(
      <Table
        data={data}
        columns={columns}
        handlePageChange={vi.fn()}
        currentPage={1}
        totalPages={1}
      />
    );

    await expect.element(page.getByText("Alice")).toBeInTheDocument();
    await expect.element(page.getByText("Bob")).toBeInTheDocument();
  });

  it("renders 'No Data Available' when data is empty", async () => {
    render(
      <Table
        data={[]}
        columns={columns}
        handlePageChange={vi.fn()}
        currentPage={1}
        totalPages={1}
      />
    );

    await expect
      .element(page.getByText("No Data Available"))
      .toBeInTheDocument();
  });

  it("renders pagination when totalPages > 1", async () => {
    render(
      <Table
        data={data}
        columns={columns}
        handlePageChange={vi.fn()}
        currentPage={1}
        totalPages={10}
      />
    );

    await expect.element(page.getByText("<<")).toBeInTheDocument();
    await expect.element(page.getByText(">>")).toBeInTheDocument();
  });
});
