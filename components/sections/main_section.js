import Section from "./section";

export default function MainSection({ children }) {
  return (
    <Section
      columns={8}
      spaceBefore={1}
      spaceAfter={3}
      className="flex flex-col-reverse"
    >
      <div className="py-[6rem]">{children}</div>
    </Section>
  );
}
