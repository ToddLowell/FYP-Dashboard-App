<template>
  <div class="container">
    <svg
      width="380px"
      height="500px"
      viewBox="0 0 837 1045"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
    >
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <path
          id="Polygon-1"
          d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
          stroke="#007FB2"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        ></path>
        <path
          id="Polygon-2"
          d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
          stroke="#EF4A5B"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        ></path>
        <path
          id="Polygon-3"
          d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
          stroke="#795D9C"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        ></path>
        <path
          id="Polygon-4"
          d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
          stroke="#F2773F"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        ></path>
        <path
          id="Polygon-5"
          d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
          stroke="#36B455"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        ></path>
      </g>
    </svg>
    <div class="message-box">
      <h1>404</h1>
      <p>
        Page not found or is missing. If you did not mean to come here then press the button below to go to the Home
        Page.
      </p>
      <div class="buttons-con">
        <div class="action-link-wrap">
          <a onclick="history.back(-1)" class="link-button link-back-button">Go Back</a>
          <router-link to="/" class="link-button">Go to Home Page</router-link>
        </div>
      </div>
    </div>
    <div class="credit">
      Credit:
      <a href="https://codepen.io/saransh/pen/aezht" target="_blank" rel="noopener noreferrer">Saransh Sinha</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -400px;
}

.message-box {
  height: 200px;
  width: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: 50px;
  font-weight: 300;

  h1 {
    font-size: 60px;
    line-height: 46px;
    margin-bottom: 40px;
  }
}

.buttons-con .action-link-wrap {
  margin-top: 40px;

  a.link-button {
    display: inline-block;
    color: #fff;
    background: var(--clr-primary-400);
    padding: 8px 25px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    margin-right: 10px;
    box-shadow: 0 2px 2px 0 rgb(156 39 176 / 14%), 0 3px 1px -2px rgb(156 39 176 / 20%),
      0 1px 5px 0 rgb(156 39 176 / 12%);
    transition: all 0.2s ease;

    &:hover {
      background: var(--clr-primary-700);
      box-shadow: 0 14px 26px -12px rgb(156 39 176 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%),
        0 8px 10px -5px rgb(156 39 176 / 20%);
    }

    &:active {
      transform: translateY(2px);
    }
  }

  a.link-back-button {
    background: var(--clr-secondary-400);

    &:hover {
      background: var(--clr-secondary-700);
    }
  }
}

#Polygon-1,
#Polygon-2,
#Polygon-3,
#Polygon-4,
#Polygon-4,
#Polygon-5 {
  animation: float 1s infinite ease-in-out alternate;
}
#Polygon-2 {
  animation-delay: 0.2s;
}
#Polygon-3 {
  animation-delay: 0.4s;
}
#Polygon-4 {
  animation-delay: 0.6s;
}
#Polygon-5 {
  animation-delay: 0.8s;
}

@keyframes float {
  100% {
    transform: translateY(20px);
  }
}

@media (max-width: 900px) {
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -190px;
  }

  .message-box {
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -190px;
    padding: 1rem;
    text-align: center;
    background: var(--clr-light-400);
    border: 2px solid currentColor;
    border-radius: 3px;
  }
}

.credit {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
}
</style>
