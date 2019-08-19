import { CloudinaryContext, Image} from 'cloudinary-react';
import { LinkDetails } from "./styles";
import Tags from "../Tags";

export default ({ link, tags }) => {
  return (
    <LinkDetails>
      <strong style={{ }}>{link.title}</strong>
      <div style={{ marginLeft: '0.5rem', marginRight: '0.5rem', flex: 1 }}>
        <div style={{ textDecoration: 'underline' }}>{link.description}</div>
        <div>{link.description}</div>
        <div>{link.updatedAt.substr(0, 10)}</div>
        <Tags link={link} tags={Array.from(tags)} />
      </div>
      <div style={{ flex: 1 }}>
        <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD_NAME}>
          <Image publicId={link.thumbnailId} />
        </CloudinaryContext>
      </div>
    </LinkDetails>
  );
};
