@charset 'utf-8';
/* jquery.Jcrop.css v0.9.12 - MIT License */
/*
  The outer-most container in a typical Jcrop instance
  If you are having difficulty with formatting related to styles
  on a parent element, place any fixes here or in a like selector

  You can also style this element if you want to add a border, etc
  A better method for styling can be seen below with .jcrop-light
  (Add a class to the holder and style elements for that extended class)
*/
/* 尾部追加有自定义样式 */
.jcrop-holder {
  direction: ltr;
  text-align: left;
}
/* Selection Border */
.jcrop-vline,
.jcrop-hline {
  background: #ffffff;
  font-size: 0;
  position: absolute;
}
.jcrop-vline {
  height: 100%;
  width: 1px !important;
}
.jcrop-vline.right {
  right: 0;
}
.jcrop-hline {
  height: 1px !important;
  width: 100%;
}
.jcrop-hline.bottom {
  bottom: 0;
}
/* Invisible click targets */
.jcrop-tracker {
  height: 100%;
  width: 100%;
  /* "turn off" link highlight */
  -webkit-tap-highlight-color: transparent;
  /* disable callout, image save panel */
  -webkit-touch-callout: none;
  /* disable cut copy paste */
  -webkit-user-select: none;
}
/* Selection Handles */
.jcrop-handle {
  background-color: #333333;
  border: 1px #eeeeee solid;
  width: 7px;
  height: 7px;
  font-size: 1px;
}
.jcrop-handle.ord-n {
  left: 50%;
  margin-left: -4px;
  margin-top: -4px;
  top: 0;
}
.jcrop-handle.ord-s {
  bottom: 0;
  left: 50%;
  margin-bottom: -4px;
  margin-left: -4px;
}
.jcrop-handle.ord-e {
  margin-right: -4px;
  margin-top: -4px;
  right: 0;
  top: 50%;
}
.jcrop-handle.ord-w {
  left: 0;
  margin-left: -4px;
  margin-top: -4px;
  top: 50%;
}
.jcrop-handle.ord-nw {
  left: 0;
  margin-left: -4px;
  margin-top: -4px;
  top: 0;
}
.jcrop-handle.ord-ne {
  margin-right: -4px;
  margin-top: -4px;
  right: 0;
  top: 0;
}
.jcrop-handle.ord-se {
  bottom: 0;
  margin-bottom: -4px;
  margin-right: -4px;
  right: 0;
}
.jcrop-handle.ord-sw {
  bottom: 0;
  left: 0;
  margin-bottom: -4px;
  margin-left: -4px;
}
/* Dragbars */
.jcrop-dragbar.ord-n,
.jcrop-dragbar.ord-s {
  height: 7px;
  width: 100%;
}
.jcrop-dragbar.ord-e,
.jcrop-dragbar.ord-w {
  height: 100%;
  width: 7px;
}
.jcrop-dragbar.ord-n {
  margin-top: -4px;
}
.jcrop-dragbar.ord-s {
  bottom: 0;
  margin-bottom: -4px;
}
.jcrop-dragbar.ord-e {
  margin-right: -4px;
  right: 0;
}
.jcrop-dragbar.ord-w {
  margin-left: -4px;
}
/* The "jcrop-light" class/extension */
.jcrop-light .jcrop-vline,
.jcrop-light .jcrop-hline {
  background: #ffffff;
  filter: alpha(opacity=70) !important;
  opacity: .70!important;
}
.jcrop-light .jcrop-handle {
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #000000;
  border-color: #ffffff;
  border-radius: 3px;
}
/* The "jcrop-dark" class/extension */
.jcrop-dark .jcrop-vline,
.jcrop-dark .jcrop-hline {
  background: #000000;
  filter: alpha(opacity=70) !important;
  opacity: 0.7 !important;
}
.jcrop-dark .jcrop-handle {
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #ffffff;
  border-color: #000000;
  border-radius: 3px;
}
/* Simple macro to turn off the antlines */
.solid-line .jcrop-vline,
.solid-line .jcrop-hline {
  background: #ffffff;
}
/* Fix for twitter bootstrap et al. */
.jcrop-holder img,
img.jcrop-preview {
  max-width: none;
}

/**
 * 自定义裁剪图片弹框样式
 */
.imgup-block1 {
    float: left;
}
.imgup-block .img-drag-pane {
    background-color: #b2b2b2;
    border-radius: 4px;
    padding-top: 30px;
}
.imgup-block .img-drag-container {
    margin-left: -1px;
    border:dotted 1px #ddd;
    background-color: #fff;
}
.imgup-block .img-drag-container .p1 {
    margin-top: 25%;
    color: #808080;
    text-align: center;
    border-bottom: none;
    padding-top: 0;
    padding-bottom: 0;
}
.imgup-block .img-drag-container .p1 b {
    font-size: 24px;
    vertical-align: -3px;
    color: #999;
}
.imgup-block .img-drag-container .p2 {
    color: #999;
    margin-top: 5px;
    text-align: center;
    border-bottom: none;
    padding-top: 0;
}

.imgup-block1 .file-btn {
    display:block;
    height:32px;
    line-height:32px;
    border:solid 1px #ddd;
    border-radius:2px;
    cursor:pointer;
    text-align: center;
    margin-top: 20px;
}
.imgup-block1 b {
    font-size: 20px;
    color: #999;
    vertical-align: -3px;
}
.imgup-block1 .file-tips {
    display:inline-block;
    width:290px;
    margin-top:10px;
    color:#666;
}
.imgup-block2 {
    float:right;
}
.imgup-block2 .img-fi-preview {
    border: solid 1px #ddd;
    border-radius: 2px;
    position: relative;
}
.jcrop-holder .preview-pane {
  display: block;
  position: absolute;
  z-index: 2000;
  border-radius: 2px;
  border: solid 1px #ddd;
}