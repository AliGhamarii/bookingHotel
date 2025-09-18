import Map from "../Map/Map";

function BookmarkLayout() {
  return (
    <div className="w-full max-h-screen flex">
      <div className="w-[40%] mr-10">{/* <Outlet /> */}</div>
      <Map markerLocation={[]} />
    </div>
  );
}

export default BookmarkLayout;
