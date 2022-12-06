import React from 'react';
import styles from './welcomepage.module.css';

const WelcomePage = ({signUpHandler,loginHandler}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
              <div>
                <img className={styles.logo} alt='carrot-market-logo' src="images/carrot_market_logo.png" />
              </div>
              <div className={styles.title}>당신 근처의 당근마켓</div>
              <div className={styles.subTitle}>내 동네를 설정하고</div>
              <div className={styles.subTitle}>당근마켓을 시작해보세요.</div>
            </div>
            <div className={styles.bottom}>
              <button className='btnOrange' onClick={signUpHandler}>시작하기</button>
              <div className={styles.textGray}>이미 계정이 있나요? <span onClick={loginHandler}>로그인</span></div>
            </div>
          </div>
    );
}

export default WelcomePage;