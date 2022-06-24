import React, { ReactElement } from "react";
import styles from './index.module.scss';

interface SkeletonProps {
  isVisible: boolean;
  depth?: number;
  children: ReactElement;
}

const createModal = (children: ReactElement, depth: number, current: number): ReactElement | null => {
  if (
    depth === current ||
    (children && children.props && children.props['data-skeleton-ignore'])
  ) {
    return null;
  }
  if (
    children &&
    children.props &&
    children.props.children &&
    Array.isArray(children.props.children) &&
    current < depth - 1
  ) {
    return (
      <div
        className={`${
          children.props.className !== undefined ? children.props.className : ''
        } ${styles['react-skeleton']}`}
        style={
          children.props && children.props['data-skeleton-style']
            ? children.props['data-skeleton-style']
            : {}
        }
        key={Math.random() * 1000}
      >
        {children.props.children && children.props.children.length > 0
          ? children.props.children.map((child: any) => {
              return createModal(child, depth, current + 1);
            })
          : '*'}
      </div>
    );
  } else {
    return (
      <div
        className={`${
          children.props && children.props.className ? children.props.className : ''
        } ${styles['react-skeleton2']}`}
        style={
          children.props && children.props['data-skeleton-style']
            ? children.props['data-skeleton-style']
            : {}
        }
        key={Math.random() * 1000}
      >
        {children}
      </div>
    );
  }
};

const Skeleton: React.FC<SkeletonProps> = ({
  isVisible,
  depth,
  children,
}): ReactElement | null => {
  if (isVisible) {
    return createModal(children, depth || 4, 0);
  } else {
    return children ? children : null;
  }
};

export default Skeleton;
