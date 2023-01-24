import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  tarhelyek: Tarhely[];
  regName: string;
  regPrice: number;
  regSize: number;
}

interface Tarhely{
  id: number;
  nev: string;
  meret: number;
  ar: number;
}

interface TarhelyListaResponse {
  adatok: Tarhely[];
}

class App extends Component<{}, State>{

  constructor(props: {}){
    super(props);

    this.state = {
      regName: '',
      regPrice: 0,
      regSize: 0,
      tarhelyek: [],
    }
  }

  async tarhelyekBetoltese(){
    let response = await fetch('http://localhost:3000/api/tarhely');
    let data = await response.json() as TarhelyListaResponse;
    this.setState({
      tarhelyek: data.adatok,
    })
  }

  componentDidMount(){
    this.tarhelyekBetoltese();
  }

  handleRegister = async () => {
    const { regName, regPrice, regSize } = this.state;
    if(regName.trim() === '' || regPrice<=0 || regSize<=0) {
      alert('hiba');
      return;
    }

    const adat = {
      nev: regName,
      ar: regPrice,
      meret: regSize,
    };

    let response = await fetch('http://localhost:3000/api/tarhely', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      regName: '',
      regPrice: 0,
      regSize: 0,
    })

    await this.tarhelyekBetoltese();
  }

  render(){
    const { regName, regPrice, regSize } = this.state;

    return <div>
      <h2>Új tárhely</h2>
      Név: <input type="text" value={regName} onChange={e => this.setState({ regName: e.currentTarget.value })} /> <br />
      Ár: <input type="number" value={regPrice} onChange={e => this.setState({ regPrice:parseInt(e.currentTarget.value)})} /> <br />
      Méret: <input type="number" value={regSize} onChange={e => this.setState({ regSize:parseInt(e.currentTarget.value)})}/> <br />
      <button onClick={this.handleRegister}>Regisztráció</button>
      <br />
      <div className='container'>
        <div className='row'>       
            {
              this.state.tarhelyek.map(tarhely => <div className='col-lg-4 col-md-4 col-sm-12'> <li>név: {tarhely.nev}</li> <li>ár: {tarhely.ar}</li> <li>méret: {tarhely.meret}</li> <br /></div> )
            }       
        </div>
      </div>
      
    </div>;
  }

}

export default App;
