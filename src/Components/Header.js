import Jumbotron from 'react-bootstrap/Jumbotron'

function Header() {
    return (
        <>
            <Jumbotron>
                <div class="row">
                    <div class="col-lg-1 align-items-center d-flex">
                        <img src={process.env.REACT_APP_QR_URL} alt='QR not found'/>
                    </div>
                    <div class="col-lg-11 align-items-center">
                        <h1 className="display-4 text-center">Scoreboard</h1>
                        <p className="lead text-center">Game night just got real!</p>
                    </div>
                </div>
            </Jumbotron>
        </>
    )
}

export default Header