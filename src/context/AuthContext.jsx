import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomePage from '../components/welcomepage/welcomepage';

const AuthContext = createContext({});

const csrfRef = createRef();
export const AuthProvider = ({ authService, locationService, authErrorEventBus, children }) => {
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);
  const navigate = useNavigate();

  useImperativeHandle(csrfRef, () => csrfToken);

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.csrfToken().then(setCsrfToken).catch(console.error);
  }, [authService]);

  useEffect(() => {
    authService.me().then((data) => {
      setUser(data);
    }).catch(console.error);
  }, [authService]);


  const signUp = useCallback(
    async (myplace, inPhoneNumberVarified, image, nickname) =>
      authService
        .signUp(myplace, inPhoneNumberVarified, image, nickname)
        .then((data) => {
          setUser(data.user);
          localStorage.removeItem('userData');
          navigate('/');
        }),
    [authService]
  );

  const logIn = useCallback(
    async (phoneNumber) =>
      authService.login(phoneNumber).then((data) => {
        console.log(data.user);
        if (data.message) {
          alert(data.message);
        } else {
          setUser(data.user);
          navigate('/');
        }
      }),
    [authService]
  );

  const logout = useCallback(
    async () => authService.logout().then(() => {
      setUser(undefined);
      localStorage.clear();
    }),
    [authService]
  );

  //사용자 정보 수정
  const update = useCallback(
    async (data) => authService.update(data).then((user) => {
      setUser(user);
    }),
    [authService]
  )

  //내 동네 근처 동네 정보 가져오기
  const getNearAddress = useCallback(async (x,y) =>
    locationService.getNearLocation(x,y).then((address) => {
      const count = [
        address.length * 10 / 100, // 6
        address.length * 15 / 100, // 9
        address.length * 35 / 100, // 21
        address.length * 40 / 100, // 24
      ]
      const range = [
        {
          idx:0,
          value: count[0],
          label: `${count[0]}`,
        },
        {
          idx:1,
          value: count[0] + count[1],
          label: `${count[0] + count[1]}`,
        },
        {
          idx:2,
          value: count[0] + count[1] + count[2],
          label: `${count[0] + count[1] + count[2]}`,
        },
        {
          idx:3,
          value: count[0] + count[1] + count[2] + count[3],
          label: `${count[0] + count[1] + count[2] + count[3]}`,
        },
      ];
      return {
        address,
        range
      };
    }), [locationService])

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
      update,
      getNearAddress
    }),
    [user, signUp, logIn, logout, update, getNearAddress]
  );

  const signUpHandler = () => {
    setUser({});
    navigate('/get-location', { replace: true });
  }

  const loginHandler = () => {
    setUser({});
    navigate('/varify-phonenumber', { replace: true, state: { isLogIn: true } });
  }


  // - 회원 가입
  //  시작 페이지 -> 내 동네 설정 페이지 -> 휴대폰 인증 페이지 -> 프로필 설정 페이지 -> 당근알바 메인 페이지
  // - 로그인
  //  시작 페이지 -> 로그인 페이지 -> 당근알바 메인 페이지
  return (
    <AuthContext.Provider value={context}>
      {
        user ?
          (children) :
          <WelcomePage signUpHandler={signUpHandler} loginHandler={loginHandler} />
      }
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    this.callback(error);
  }
}
export default AuthContext;
export const fetchCsrfToken = () => csrfRef.current;
export const useAuth = () => useContext(AuthContext);
