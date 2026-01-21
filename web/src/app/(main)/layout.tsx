import { BottomNav } from "../../components/bottom-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex justify-center">
       <div className="w-full max-w-md flex flex-col bg-sky-50 shadow-lg sm:max-w-lg min-h-screen relative">
          {children}
          <BottomNav />
       </div>
    </div>
  );
}
