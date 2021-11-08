import { Breadcrumb } from 'rsuite';

interface BreadCrumb {
  breadcrumb: string[] | null;
}

export const BreadCrumb = ({ breadcrumb }: BreadCrumb): JSX.Element | null =>
  breadcrumb && (
    <div className="BreadcrumbContainer">
      <Breadcrumb>
        {breadcrumb.length > 0 &&
          breadcrumb.map((item: string, index: number) => (
            <Breadcrumb.Item
              href={
                index === 0
                  ? '/'
                  : `${breadcrumb.slice(0, index + 1).join('/')}`
              }
              key={item}
              active={index === breadcrumb.length - 1 ? true : false}
            >
              {index === 0 ? 'خانه' : `${decodeURI(item)}`}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </div>
  );
