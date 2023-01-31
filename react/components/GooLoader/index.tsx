import * as React from 'react';
import Lottie from 'react-lottie';

import Goo from '../../../public/lottie/goo.json';

export const GooLoader = React.memo(
  function GooLoader({
    style,
  }: {
    readonly style?: React.CSSProperties;
  }): JSX.Element {
    return (
      <div style={style}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: Goo,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={400}
          width={400}
        />
      </div>
    );
  }
);
