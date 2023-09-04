
let Animator = {

  animated: {},
  elementInViewport2(el)
  {
    if(!el)
      return;
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  },

  onShow(id, callback) {
    if (typeof callback != 'function')
      return;
    let el = document.getElementById(id);
    if (this.elementInViewport2(el))
      callback();
  },

  animate(triggerId, animates, once = true){
    if(!this.animated)
      this.animated = {};
    if (once && Animator.animated[triggerId])
      return;
    this.onShow(triggerId, function () {
      if (typeof animates == 'string') {
      }
      if (!Array.isArray(animates))
        return;
      if (once)
        Animator.animated[triggerId] = true;
      animates.forEach(item => {
        if (typeof item == 'string') {
          let elm = document.querySelector(item);
          elm.classList.add('shown');
          return;
        }
        if (typeof item != 'object')
          return;
        let selector = item.selector ?? ('#' + item.id) ?? ('.' + item.class);
        let addedClass = item?.addedClass ?? 'shown';
        let removedClass = item?.removedClass ?? '';
        let delay = item.delay;
        let elm = document.querySelector(selector);
        if(!elm)
          return;
        if(delay > 0){
          setTimeout(()=>{
            if(addedClass)
              elm.classList.add(addedClass);
            if(removedClass)
              elm.classList.remove(removedClass);
          }, delay)
        } else {
          if(addedClass)
            elm.classList.add(addedClass);
          if(removedClass)
            elm.classList.remove(removedClass);
        }
      });
    })
  },
  animateOnShow(triggerId, animates, once = true) {
    Animator.animate(triggerId, animates, once);
    window.addEventListener('scroll' ,function() {
      Animator.animate(triggerId, animates, once);
    });
    window.addEventListener('resize' ,function() {
      Animator.animate(triggerId, animates, once);
    });
  }
}

export default Animator;