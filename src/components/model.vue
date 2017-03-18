/*

说明：
1.标签：vModel
2.默认状态：checked
3.是否显示头部：为了友好手机端，默认设置不显示头部(不写就可以了)，如需要显示：isHeadShow = true
4.父组件关闭弹窗操作：this.$refs.{refName}.modelHide()
5.类型：type = 'pop'、'alert'、'confirm' 三种任选其一。
6.内容分发：slot为容器。宽度100%，高度自定义

7.不明白 参考hello2示例，都有写

示例：
<vModel ref="model" :isHeadShow="自己定义的变量"></vModel>

<vModel ref="alert" type="alert" @alertEvent="alertBtnEvent">
  <div slot="alert"> 我是一个alert弹窗</div>
</vModel>

*/


<template>
  <transition name="animateBase">
    <div class="screen1" v-show="isModelShow" @click="modelBgHide">
      <div class="model-box">
        <div class="model">
          <div class="main" @click.stop="popupClick">

            <div class="pop" v-if="type == 'pop'"><!-- model 弹窗 -->
              <div class="head" v-show="isHeadShow">
                <span class="title">弹出窗口</span>
                <span class="close" @click.stop="modelClose">x</span>
              </div>
              <div class="body">
                <slot name="modalbody"></slot>
              </div>
              <div class="foot">
                <slot name="modalfoot"></slot>
              </div>
            </div>

            <div v-if="type == 'alert'"><!-- alert 弹窗 -->
              <div class="alert">
                <div class="top">
                  <slot name="alert"></slot>
                </div>
                <div class="bottom">
                  <button @click="alert_BtnEvent">确 认</button>
                </div>
              </div>
            </div>

            <div v-if="type == 'confirm'"><!-- confirm 弹窗 -->
              <div class="confirm">
                <div class="top">
                  <slot name="confirm"></slot>
                </div>
                <div class="bottom">
                  <button @click="confirm_BtnEvent(1)" class="radius-left">确 认</button>
                  <button @click="confirm_BtnEvent(0)" class="radius-right">取 消</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'vModel',
    created: function () {
      console.log(this.type);
    },
    props: ['isHeadShow', 'type'],
    data () {
      return {
        isModelShow: false
      };
    },
    methods: {
      popupClick: function () {
      },
      modelClose: function () {
        this.isModelShow = false;
      },
      modelOpen: function () {
        this.isModelShow = true;
      },
      modelBgHide: function () {
        if (this.type === 'pop') {
          this.modelClose();
        }
      },
      alert_BtnEvent: function () {
        this.modelClose();
        this.$emit('alertEvent');
      },
      confirm_BtnEvent: function (num) {
        // 等待填充内容
        this.modelClose();
        this.$emit('confirmEvent', num);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


  .screen1 {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
    .model-box {
      display: table;
      width: 100%;
      height: 100%;
      font-family: "微软雅黑";
      .model {
        vertical-align: middle;
        display: table-cell;
        text-align: center;
        .main {
          display: inline-block;
          text-align: left;
          width: 70%;
          transition: all 0.3s ease;
          .pop {
            background: #fff;
            .head {
              width: 100%;
              background: green;
              .close {
                width: 30px;
                height: 30px;
                float: right;
                margin: 10px;
                cursor: pointer;
                font-size: 25px;
                line-height: 30px;
                color: #fff;
                font-family: Arial;
                opacity: 0.6;
                &:active {
                  opacity: 1;
                }
              }
              .title {
                width: 100%;
                line-height: 50px;
                color: #fff;
                font-size: 16px;
                text-align: center;
                padding-left: 30px
              }
            }
          }
          .alert {
            width: 100%;
            display: block;
            border-radius: 10px;
            background: #fff;
            .top {
              width: 92%;
              padding: 15px 4%;
            }
            .bottom {
              width: 100%;
              height: 45px;
              button {
                width: 100%;
                height: 100%;
                background: #fff;
                border: none;
                border-top: 1px solid #56aeb0;
                font-size: 17px;
                color: #108d93;
                border-radius: 0 0 10px 10px;
                font-family: "微软雅黑";
                outline: none;
                &:active {
                  transition: background 0.2s ease;
                  background: #ddd;
                }
              }
            }
          }
          .confirm {
            width: 100%;
            display: block;
            border-radius: 10px;
            background: #fff;
            .top {
              width: 92%;
              padding: 15px 4%;
            }
            .bottom {
              width: 100%;
              height: 45px;
              button {
                width: 50%;
                height: 100%;
                background: #fff;
                border: 1px solid #ddd;
                float: left;
                font-size: 16px;
                color: #333;
                font-family: "微软雅黑";
                outline: none;
                &:active {
                  transition: background 0.2s ease;
                  background: #ddd;
                }
                &.radius-left {
                  border-radius: 0 0 0 10px;
                  border-right: none !important;
                }
                &.radius-right {
                  border-radius: 0 0 10px 0;
                }
              }
            }
          }
        }
      }
    }
  }

  .animateBase-enter,
  .animateBase-leave-active {
    opacity: 0;
  }
</style>
