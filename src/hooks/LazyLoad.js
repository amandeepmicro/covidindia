import React from 'react';
import { useInView } from 'react-intersection-observer';
import PlaceholderImage from './../components/PlaceholderImage/PlaceholderImage';

export default function LazyLoad(props) {
  const { tag = 'div', children, style, className } = props;
  const Tag = tag;

  const options = {
    root: props.root ?? null,
    threshold: props.threshold ?? 0,
    rootMargin: props.rootMargin ?? '100px',
    triggerOnce:props.triggerOnce ?? true,
    initialInView:props.initialInView ?? false
  }
  const { ref, inView } = useInView({...options});

  return (
      <Tag
          ref={ref}
          style={style}
          className={className}
          children={inView ? children : <PlaceholderImage/>}
      />
  )
}