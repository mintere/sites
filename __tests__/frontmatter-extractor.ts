import FrontmatterExtractor from "../src/precompiler/frontmatter-extractor";

test("passthrough with no frontmatter", () => {
  const mock = jest.fn();

  const ex = new FrontmatterExtractor();

  const t = Buffer.from(`
--
---
arthawioerktjlaw4e
---
wheee
`);

  ex._transform(t, void 0 as any, mock);

  expect(mock).toBeCalledWith(null, t);
});

test("passthrough stream with no frontmatter", async () => {
  const ex = new FrontmatterExtractor();

  const promise = new Promise<void>((res, rej) => {
    ex.on("end", () => {
      res();
    });
    ex.on("error", (e) => {
      rej(e);
    });
  });

  const strings = [
    "--",
    "\n----\n",
    "--\n",
    "\n---\n",
    "arthawioerktjlaw---4e",
    "whee",
  ];

  let res: Buffer[] = [];
  ex.on("data", (chunk: Buffer) => {
    res.push(chunk);
  });

  strings.forEach((s: string) => ex.write(Buffer.from(s)));

  ex.end();

  await promise;

  expect(Buffer.concat(res).toString()).toBe(strings.join(""));
});

test("passthrough stream with frontmatter", async () => {
  const ex = new FrontmatterExtractor();

  const promise = new Promise<void>((res, rej) => {
    ex.on("end", () => {
      res();
    });
    ex.on("error", (e) => {
      rej(e);
    });
  });

  const frontmatter = "this is frontmatter 51234\n--- \nwh---ee";

  const body = `
test
  
  test`;

  const testString = `---
${frontmatter}
---
${body}`;

  let res: Buffer[] = [];
  ex.on("data", (chunk: Buffer) => {
    res.push(chunk);
  });

  testString.split("").forEach((s: string) => ex.write(Buffer.from(s)));

  ex.end();

  await promise;

  expect(Buffer.concat(res).toString()).toBe(body);
  expect(await ex.extractedFrontmatter).toBe(frontmatter);
});


test("parses frontmatter", async () => {
  const ex = new FrontmatterExtractor();

  const frontmatter = `
{
  foo: 5
}`;

  const body = `
test is a {{foo}}`;

  const testString = `---
${frontmatter}
---
${body}`;

  let res: Buffer[] = [];
  ex.on("data", (chunk: Buffer) => {
    res.push(chunk);
  });

  testString.split("").forEach((s: string) => ex.write(Buffer.from(s)));

  ex.end();

  expect(Buffer.concat(res).toString()).toBe(body);
  expect(await ex.extractedFrontmatter).toStrictEqual(frontmatter);
});

test("gets frontmatter async", async () => {
  const ex = new FrontmatterExtractor();

  const frontmatter = `{
  numberAsString: "5"
}`;

  const body = `
test is a {{foo}}`;

  const testString = `---
${frontmatter}
---
${body}`;

  let res: Buffer[] = [];
  ex.on("data", (chunk: Buffer) => {
    res.push(chunk);
  });

  testString.split("").forEach((s: string) => ex.write(Buffer.from(s)));

  ex.end();
  
  expect(Buffer.concat(res).toString()).toBe(body);
  expect(await ex.parsedFrontmatter()).toStrictEqual({ numberAsString: "5"});
});

test("returns undefined when no frontmatter", async () => {
  const ex = new FrontmatterExtractor();

  const testString = `
this has no  frontmatter
---

`;

  testString.split("").forEach((s: string) => ex.write(Buffer.from(s)));

  ex.end();

  await expect(ex.extractedFrontmatter).resolves.toBeFalsy();
});

test("fails on neverending frontmatter", async () => {
  const ex = new FrontmatterExtractor();

  const testString = `---
this is neverending frontmatter
`;

  testString.split("").forEach((s: string) => ex.write(Buffer.from(s)));

  ex.end();

  await expect(ex.extractedFrontmatter).rejects.toThrow("Front-matter did not end.");
});
