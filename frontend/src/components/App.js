import React from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
import * as auth from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import succesImg from '../images/loginTrue.svg';
import failImg from '../images/loginFalse.svg'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = React.useState('')
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const history = useHistory();
  const [isAddNewUser, setIsAddNewUser] = React.useState({ opened: false, success: false })

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
    setIsAddNewUser({ success: false, fall: false })
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleLogin = ({ email, password }) => {
    return auth.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        tokenCheck();
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        setIsAddNewUser({ opened: true, success: false });
        console.log(err);
      })
  }

  const handleRegister = ({ password, email }) => {
    return auth.register({ password, email })
      .then(() => {
        setIsAddNewUser({ opened: true, success: true });
        history.push('/signin');
      })
      .catch(err => {
        setIsAddNewUser({ opened: true, success: false });
        console.log(err);
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserData(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }
    history.push('/signin');
  }, [loggedIn, history]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getProfile()
        .then(res =>
          setCurrentUser(res)
        )
      api.getInitialCards()
        .then((card) => {
          setCards(card)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn])

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(items => items.filter(item => item._id !== card._id))
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.getAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUserData('');
    setLoggedIn(false);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} handleLogout={handleLogout} />
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}>
          </ProtectedRoute>
          <Route exact path='/signup'> <Register handleRegister={handleRegister} /> </Route>
          <Route exact path='/signin'> <Login handleLogin={handleLogin} tokenCheck={tokenCheck} /> </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isAddNewUser.opened}
          image={isAddNewUser.success ? succesImg : failImg}
          text={isAddNewUser.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
