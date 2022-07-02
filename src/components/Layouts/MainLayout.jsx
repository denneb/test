import { TopBar } from '../ui/TopBar';

export const MainLayout = ({ children }) => {
  return (
    <div style={{ maxWidth: '100vw' }} className="styled-scrollbar">
      <TopBar />

      {/**Container de info*/}
      <div
        style={{
          paddingLeft: '28px',
          paddingRight: '28px',
          paddingTop: '20px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
