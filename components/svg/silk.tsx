import * as React from 'react';
import Svg from 'react-native-svg';
import Icon from '../../models/icon';

export default function SilkSvgComponent(props: { icon: Icon }) {
  return (
    <Svg width={props.icon.width} height={props.icon.height} viewBox="0 0 512 512">
      <path d="m10 111h162v360h-162c-5.523 0-10-4.477-10-10v-340c0-5.523 4.477-10 10-10z" fill="#FF4B4B"/>
      <path d="M0,407.5v-15h36.894L52.5,376.893V322.27l-18.74-28.11c-2.298-3.446-1.366-8.103,2.08-10.4  s8.104-1.366,10.4,2.08l6.26,9.39V260c0-4.143,3.357-7.5,7.5-7.5s7.5,3.357,7.5,7.5v28.229l5.792-11.584  c1.852-3.704,6.356-5.208,10.063-3.354c3.704,1.853,5.206,6.357,3.354,10.063L67.5,321.771v40.123l64.226-63.834  c2.93-2.928,7.678-2.928,10.607,0c2.929,2.93,2.929,7.678,0,10.607l-97.03,96.637C43.896,406.71,41.989,407.5,40,407.5H0z" fill="#FFB450"/>
      <path d="m212 441c0 16.569-13.431 30-30 30h-30c-16.569 0-30-13.431-30-30v-11c0-16.569 13.431-30 30-30h60v41z" fill="#CF4036"/>
      <path d="m482 52c16.569 0 30 13.431 30 30v299c0 16.569-13.431 30-30 30h-330c-16.569 0-30 13.431-30 30v-359c0-16.569 13.431-30 30-30h330z" fill="#FF6969"/>
      <path d="m431 132v-116c0-8.837 7.163-16 16-16s16 7.163 16 16v116h-32z" fill="#CE8855"/>
      <path d="m412 42h70c16.569 0 30 13.431 30 30v393.5c0 16.569-13.431 30-30 30h-70c-16.569 0-30-13.431-30-30v-393.5c0-16.569 13.431-30 30-30z" fill="#FF4B4B"/>
      <path d="m357.5 235c0 4.143-3.357 7.5-7.5 7.5h-101.89l-22.499 22.5 17.5 17.5h56.893c4.143 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5h-37.5l22 16.5c3.313 2.485 3.985 7.187 1.5 10.5-1.474 1.965-3.726 3-6.006 3-1.565 0-3.145-0.488-4.494-1.5l-20.792-15.594 12.407 37.222c1.31 3.93-0.813 8.178-4.743 9.487-0.787 0.262-1.587 0.387-2.373 0.387-3.141 0-6.066-1.987-7.114-5.13l-14.274-42.823-21.903 43.805c-1.313 2.628-3.963 4.147-6.714 4.147-1.127 0-2.271-0.255-3.349-0.794-3.704-1.853-5.206-6.357-3.354-10.063l27.582-55.164-70.873-70.873-34.696 34.697c-0.951 0.95-2.094 1.587-3.304 1.92v-19.832l72.696-72.696c1.407-1.406 3.314-2.196 5.304-2.196h47.5l-22-16.5c-3.313-2.485-3.985-7.187-1.5-10.5 2.485-3.314 7.185-3.985 10.5-1.5l20.792 15.594-12.407-37.222c-1.31-3.93 0.813-8.178 4.743-9.487 3.931-1.308 8.177 0.813 9.487 4.743l14.274 42.823 21.903-43.805c1.852-3.705 6.356-5.208 10.063-3.354 3.704 1.853 5.206 6.357 3.354 10.063l-24.574 49.145h15.594l28.11-18.74c3.446-2.297 8.103-1.366 10.4 2.08s1.366 8.103-2.08 10.4l-30 20c-1.231 0.821-2.68 1.26-4.16 1.26h-29.985l-0.016 2e-3h-5e-3c-0.011 0-0.023-2e-3 -0.034-2e-3h-66.854l-32.498 32.5 44.393 44.393 24.696-24.696c1.407-1.406 3.314-2.196 5.304-2.196h26.893l22.804-22.804c2.93-2.928 7.678-2.928 10.607 0 2.929 2.93 2.929 7.678 0 10.607l-12.197 12.196h56.893c4.143 0 7.5 3.357 7.5 7.5z" fill="#FFCF65"/>
      <path d="m512 199.01v21.261l-54.08 54.323c-0.38 0.489-0.817 0.928-1.304 1.31l-19.301 19.388c-1.408 1.414-3.32 2.209-5.315 2.209h-50v-15h46.884l15.616-15.687v-54.543l-18.74-28.11c-2.298-3.446-1.366-8.103 2.08-10.4s8.104-1.367 10.4 2.08l6.26 9.39v-35.23c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v28.229l5.792-11.584c1.852-3.704 6.356-5.208 10.063-3.354 3.704 1.853 5.206 6.357 3.354 10.063l-19.209 38.417v39.975l52.5-52.737z" fill="#FFB450"/>
      <path d="m512 72v393.5c0 16.569-13.431 30-30 30h-22c16.569 0 30-13.431 30-30v-393.5c0-16.569-13.431-30-30-30h22c16.569 0 30 13.431 30 30z" fill="#D24A4A"/>
      <path d="m412 432h70c16.569 0 30 13.431 30 30v3.5c0 16.569-13.431 30-30 30h-70c-16.569 0-30-13.431-30-30v-3.5c0-16.569 13.431-30 30-30z" fill="#C83741"/>
      <path d="m463 462v34c0 8.836-7.164 16-16 16s-16-7.164-16-16v-34h32z" fill="#CE8855"/>
      <path d="m484.5 462c0 4.143-3.357 7.5-7.5 7.5h-60c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h60c4.143 0 7.5 3.357 7.5 7.5z" fill="#963737"/>
      <path d="m512 199.01v21.261l-22 22.099v-21.261l22-22.099z" fill="#FF9744"/>
    </Svg>
  );
}
