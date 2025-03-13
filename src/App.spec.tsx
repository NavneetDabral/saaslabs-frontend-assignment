import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import App from "./App";

test("renders app", async () => {
  const screen = render(<App />);
  await expect
    .element(screen.getByText("🚀 Kickstarter Project"))
    .toBeVisible();
});
