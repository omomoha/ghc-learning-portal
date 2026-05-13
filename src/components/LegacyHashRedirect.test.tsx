import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LegacyHashRedirect } from "./LegacyHashRedirect";

describe("LegacyHashRedirect", () => {
  it("renders nothing", () => {
    const { container } = render(
      <MemoryRouter>
        <LegacyHashRedirect />
      </MemoryRouter>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
