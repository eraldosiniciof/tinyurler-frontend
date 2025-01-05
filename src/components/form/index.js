"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL;

export function FormComponent() {
  const [url, setUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState(null);

  async function shorterUrl(url) {
    try {
      const result = await fetch(PUBLIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original: url }),
      });

      if (!result.ok) {
        throw new Error("Erro na requisição");
      }

      console.log(result);
      const data = await result.json();
      setShortedUrl(data[0]);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <>
      <img
        width={200}
        src="logo.webp"
        className="rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
      />

      <Input
        onChange={({ target }) => setUrl(target.value)}
        placeholder="http://www.google.com"
      />

      <Button onClick={() => shorterUrl(url)}>Encurtar</Button>

      {shortedUrl && (
        <div>
          Seu link encurtado: {PUBLIC_URL}/{shortedUrl.short}
        </div>
      )}
    </>
  );
}
