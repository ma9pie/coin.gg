import React from "react";

export default function Home() {
  return (
    <div>
      <div>Home Page2</div>
      <div>{process.env.NEXT_PUBLIC_MODE}</div>
    </div>
  );
}
