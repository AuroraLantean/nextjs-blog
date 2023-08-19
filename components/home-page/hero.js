import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/AuroraClassWarship776.png"
          alt="An image showing AuroraClassWarship776"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm a Web3 Solidity/Rust and NextJs developer!</h1>
      <p>I blog about Web3/Blockchain/Crypto development...</p>
    </section>
  );
}

export default Hero;
