import {
  Header,
  Hero,
  ProblemaSolucion,
  Beneficios,
  ComoFunciona,
  Integraciones,
  Pricing,
  CTAFinal,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main>
        <Hero />
        <ProblemaSolucion />
        <Beneficios />
        <Integraciones />
        <ComoFunciona />
        <Pricing />
        <CTAFinal />
        <Footer />
      </main>
    </div>
  );
}
