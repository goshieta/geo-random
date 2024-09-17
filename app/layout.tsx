import type { Metadata } from "next";
import {Sawarabi_Gothic} from "next/font/google";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "偶然旅行 - ランダムで行き先を決めよう",
  description: "どこかに行きたいけどどこに行こう？様々な条件からランダムな地点をあなたに提示します。散歩、サイクリング、ドライブなど様々な場面で大活躍！",
};

const SawarabiGothicFont=Sawarabi_Gothic({
  weight:"400",
  subsets:["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={SawarabiGothicFont.style}>
      <body>
        {children}
      </body>
    </html>
  );
}
