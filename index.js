#!/usr/bin/env


import { format } from "date-fns";
import Pageres from "pageres";
import readline from "readline";

const promptUserInput = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

const takeweb = async (delay, url, size) => {
  const date = format(new Date(), "yyyy-MM-dd-HH-mm");

  const filenameTemplate = `${date}-<%= url %>-<%= size %><%= crop %>`;

  const directory = "/home/daire/Gambar/cli_Screenshots";

  await new Pageres({ delay: delay })
    .source(url, [size], {
      filename: filenameTemplate,
    })
    .destination(directory)
    .run();

  console.log("Screenshot done!");
};

const main = async () => {
  try {
    const delay = await promptUserInput("Enter delay (in seconds): ");
    const url = await promptUserInput("Enter the URL: ");
    const size = await promptUserInput("Enter the size (e.g., 1024x768): ");

    await takeweb(parseInt(delay, 10), url, size);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();

