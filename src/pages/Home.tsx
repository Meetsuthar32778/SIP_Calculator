import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonSearchbar, IonRange, IonButton, IonCard, IonCardContent, IonFooter } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import menu_img from '../assets/image.png';
import logo from '../assets/groww-logo-light.svg';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const Home: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(30000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(0);

  const calc = () => {
    const p = monthlyInvestment;
    const i = annualRate / 12 / 100;
    const n = years * 12;
    const FV = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    setFutureValue(FV);
  };

  // Chart data for Doughnut
  const doughnutData = {
    labels: ['Invested Amount','Est. Returns'],
    datasets: [
      {
        label: 'SIP Breakdown',
        data: [monthlyInvestment * years * 12, futureValue - monthlyInvestment * years * 12],
        backgroundColor: ['#5367ff', '#eef1ff'],
        borderColor: ['#5367ff', '#eef1ff'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'SIP Breakdown',
      },
    },
    cutout: '70%', // Adjusts the thickness (set this to any percentage or pixel value)
  };

  return (
    <>
      <IonMenu side="end" contentId="main-content">
        <IonHeader>
          <img src={menu_img} alt="" />
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <div>
              <div className="menu-pad">Filter Stocks</div>
              <div className="menu-pad">Filter Mutual Funds</div>
              <div className="menu-pad">Filter US Stocks</div>
            </div>
          </IonItem>
          <IonItem>
            <div>
              <div className="menu-pad">Smart Save</div>
              <div className="menu-pad">Compare Funds</div>
            </div>
          </IonItem>
          <IonItem>
            <div>
              <div className="menu-pad">Credit</div>
            </div>
          </IonItem>
          <IonItem>
            <div>
              <div className="menu-pad">View in App</div>
              <div className="menu-pad">Help and Support</div>
            </div>
          </IonItem>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <div className="space-between">
                <div>
                  <img src={logo} alt="" />
                </div>
                <div>
                  <IonSearchbar></IonSearchbar>
                </div>
              </div>
            </IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h1>SIP Calculator</h1>
          <div>
            <IonButton shape="round">SIP</IonButton>
            <IonButton shape="round">Lumpsum</IonButton>
          </div>
          <div>
            <div className="space-between">
              <div>
                <label>Monthly Investment</label>
              </div>
              <div className='slidervalue'>
                ₹ {monthlyInvestment}
                </div>
            </div>
            <IonRange min={1000} max={100000} step={500} value={monthlyInvestment} onIonChange={e => setMonthlyInvestment(Number(e.detail.value))}></IonRange>
          </div>
          <div>
          <div className="space-between">
              <div>
                <label>Expected return rate (p.a.)</label>
              </div>
              <div className='slidervalue'>
                {annualRate}%
                </div>
            </div>
            <IonRange min={5} max={20} value={annualRate} onIonChange={e => setAnnualRate(Number(e.detail.value))}></IonRange>
          </div>
          <div>
          <div className="space-between">
              <div>
                <label>Time period</label>
              </div>
              <div className='slidervalue'>
                ₹ {years}Yr
                </div>
            </div>
            <IonRange min={1} max={30} value={years} onIonChange={e => setYears(Number(e.detail.value))}></IonRange>
          </div>
          <IonButton expand="full" onClick={calc}>
            Calculate
          </IonButton>
          <IonCard>
            <IonCardContent>
              <h2>Total Value: ₹{futureValue.toFixed(2)}</h2>
            </IonCardContent>
          </IonCard>
          <Doughnut data={doughnutData} options={doughnutOptions}/>
        </IonContent>

        <IonFooter translucent={true}>
          <IonToolbar>
            <IonButton className='sip-button' expand="full">Start SIP</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Home;
