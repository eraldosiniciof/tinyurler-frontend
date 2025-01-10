"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL;

export function FormComponent() {
  const [url, setUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  async function shorterUrl(url) {
    try {
      if (url.length === 0) {
        return toast({
          title: "Eita!",
          description:
            "Por favor includa a url original antes de fazer a requisição",
          variant: "destructive",
        });
      }

      setLoading(true);
      const result = await fetch(PUBLIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original: url }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message);
      }

      setShortedUrl(data[0]);
    } catch (error) {
      toast({
        title: "Eita!",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

y  return (
    <>
      <Image
        alt="logo"
        width={200}
        height={200}
        src="/logo.webp"
        className="rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
      />

      <Input
        disabled={loading}
        onChange={({ target }) => setUrl(target.value)}
        placeholder="http://www.google.com"
      />

      <Button disabled={loading} onClick={() => shorterUrl(url)}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Encurtando sua url...
          </>
        ) : (
          "Encurtar"
        )}
      </Button>

      {shortedUrl && (
        <div>
          Seu link encurtado: {PUBLIC_URL}/{shortedUrl.short}
        </div>
      )}
    </>
  );
}
