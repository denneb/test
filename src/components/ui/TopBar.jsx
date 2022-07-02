import logo from '../../assets/logo/mainLogo.png';

export const TopBar = () => {
  return (
    <div
      style={{
        maxWidth: '100vw',
        backgroundColor: '#006FFF',
        maxHeight: '70px',
      }}
    >
      <img
        style={{ marginLeft: '30px', marginTop: '4px', marginBotton: '4px' }}
        src={logo}
        alt="Atlantia Search"
      />
    </div>
  );
};
