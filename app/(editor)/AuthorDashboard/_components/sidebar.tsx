import Container from "@/app/components/Container";

const Sidebar = () => {
  return (
    <Container>
      <div className="pt-3 justify-center flex gap-x-3">
        <div className="shiny-border">
          <div className="shiny-border-content cursor-pointer">
            Thyroid Function
          </div>
        </div>
        <div className="shiny-border">
          <div className="shiny-border-content cursor-pointer">
            Adrenal Function
          </div>
        </div>
        <div className="shiny-border">
          <div className="shiny-border-content cursor-pointer">
            Steroid Hormones
          </div>
        </div>
        <div className="shiny-border">
          <div className="shiny-border-content cursor-pointer">
            Miscellaneous
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
