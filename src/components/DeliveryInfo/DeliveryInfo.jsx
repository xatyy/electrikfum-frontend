

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  const text = `
  <p></p><p class="MsoNormal" align="center" style="text-align: left;"><strong>Livrarea produselor de catre magazinul online www.electrikfum.ro</strong><br></p>
  <ul>
    <li>Livrarea produselor se face in termen de 1-3 zile lucratoare in toata tara</li>
    <li>Iti oferim livrare gratuita pentru toate comenzile mai mari de 250 lei. </li>
    <li>Coletul va fi expediat dupa confirmarea telefonica</li>
    <li>Daca esti deja inregistrat, coletul va fi expediat fara o confirmare in prealabil. Toate informatiile privind expeditia  vor fi comunicate pe adresa de email din comanda plasata.</li>
    <li>Livrarea se efectueaza de catre curier “Door-to-Door” la adresa furnizata</li>
    <li>Costul transportului se adauga automat la comanda ta</li>
    <li>La primul colet neridicat, ne rezervam dreptul de a nu mai expedia in sistem  ramburs, ci doar cu plata efectuata online, prin card bancar</li>
    <li>Cautam in permanenta cele mai bune servicii de curierat rapid pentru a ne perfectiona si pentru a scurta timpul de livrare</li>
    <li>Coletele vor fi expediate prin firmele de curierat SAMEDAY, DPD, CARGUS</li>
  </ul>
  <strong>Modalitati de plata: </strong><br>
  <ul>
    <li>In sistem ramburs (platiti cand ridicati coletul )</li>
    <li>Online, prin card bancar (MobilPay) </li>
  </ul>
  Daca ai ales metoda de plata online prin card bancar este necesar sa completezi un formular cu informatiile despre cardul tau, in pagina securizata a procesatorului de plati MobilPay <strong><br>
  <br>
  Taxa de transport:</strong><br>
  <ul>
    <li>15 lei - CARGUS - pentru comenzile care au valoare pana la 250 lei&nbsp;</li><li>15 lei - SAMEDAY - pentru comenzile care au valoare pana la 250 lei&nbsp;</li><li>18 lei - DPD - pentru comenzile care au valoare pana la 250 lei&nbsp;</li>
    <li>GRATUIT - pentru comenzile care au valoare peste 250 lei</li>
  </ul>
  <strong> </strong><p></p><p>
  
  <br>
  <strong>Informatii utile:</strong><br>
  <ul>
    <li>Produsele noastre sunt comercializate doar persoanelor  cu varsta peste 18 ani.</li>
    <li>Comenzile se pot face atat telefonic, cat si online. Comenzile telefonice nu au prioritate. Toate comenzile sunt procesate in ordinea in care au fost plasate de catre clienti.</li>
    <li>Pentru orice modificari ale comenzii ,te rugam sa ne contactezi telefonic la 0720.981.443 sau pe adresa de email info@electrikfum.ro</li>
    <li>Produsele se livreaza in limita stocului disponibil. In cazul in care unul sau mai multe dintre produsele comandate nu se mai afla pe stoc, vei fi instiintat in acest sens.  Ne straduim sa nu existe astfel de probleme. </li>
  </ul>
  <p></p></div>  `
  
  export default function Example() {
    return (
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Informații Livrare
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            <p className="text-base text-gray-500">
            <div
                    className="mt-4 prose prose-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
            </p>
            </dl>
          </div>
        </div>
      </div>
    )
  }
  