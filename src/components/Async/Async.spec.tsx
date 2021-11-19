import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

describe('Async Component', () => {
  it('it renders correctly', async () => {
    render(<Async />);
  
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
    // expect(await screen.findByText('Button')).toBeInTheDocument();
  
    await waitFor(() => {
      return expect(screen.getByText('Button')).toBeInTheDocument();
    })
  });
  /*
    - Utilizar o metodo findByText da lib @testing-library pois ele espera o carregamento do elemento, ao invés de usar o getByText.
    - Podemos também utilizar o waitFor.
    - Lembrando que esses metodos podemos passar como parametro o tempo que eles podem esperar, o default é 1 segundo.
  */

    it('it not renders Text element', async () => {
      render(<Async />);
    
      //await waitForElementToBeRemoved(screen.queryByText('Text example'));
      
      await waitFor(() => {
        return expect(screen.queryByText('Text example')).not.toBeInTheDocument();
      });
    });
    /*
      - Podemos utilizar o .not para obter o mesmo resultado
      - Também podemos utilizar o waitForElementToBeRemoved
      - Lembrando que o método queryByText não dá erro caso o elemento estiver vazio ''
    */
});
