import { Navbar } from '@/components/header/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Galeria } from '@/components/estrutura/Galeria';
import { Aparelhos } from '@/components/aparelhos/Aparelhos';
import { Planos } from '@/components/planos/Planos';
import { AulasColetivas } from '@/components/aulas/AulasColetivas';
import { AppAluno } from '@/components/app-aluno/AppAluno';
import { Localizacao } from '@/components/localizacao/Localizacao';
import { Footer } from '@/components/footer/Footer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-brand-dark text-white">
      <Navbar />
      <main id="conteudo-principal" className="overflow-x-hidden">
        <Hero />
        <Galeria />
        <Aparelhos />
        <Planos />
        <AulasColetivas />
        <AppAluno />
        <Localizacao />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
