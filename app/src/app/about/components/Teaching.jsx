import Text from "@/components/Text/Text";

const Teaching = ({ teaching }) => {
  if (!teaching || teaching.length == 0) return;
  return (
    <ul typo="longcopy">
      {teaching.map((teachingItem) => (
        <li>
          <Text text={teachingItem.text} />
        </li>
      ))}
    </ul>
  );
};
export default Teaching;
