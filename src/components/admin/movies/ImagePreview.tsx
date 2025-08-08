import {
  Box,
  Button,
  CloseButton,
  CloseIcon,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import { useState } from "react";

interface ImagePreview {
  imagePreviewUrls: string[];
  clearAllImages?: () => void;
  isClearAll: boolean;
  removeImage: () => void;
  selectedImages: File[];
}
const ImagePreview = ({
  imagePreviewUrls,
  clearAllImages,
  isClearAll = false,
  removeImage,
  selectedImages,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="w-full">
      {imagePreviewUrls.length > 0 && (
        <Grid.Col span={12}>
          <Group justify="space-between" mb="xs" className="!w-full">
            <Text size="sm" fw={500}>
              Image Previews ({imagePreviewUrls.length})
            </Text>
            {isClearAll && (
              <Button
                size="xs"
                variant="outline"
                onClick={clearAllImages}
                color="red"
                className="dashboard-btn !border-0 hover:!bg-transparent !text-[13px]"
              >
                Clear All
              </Button>
            )}
          </Group>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
            {imagePreviewUrls.map((url, index) => (
              <Box key={index} pos="relative">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  radius="md"
                  h={120}
                  fit="cover"
                  loading="lazy"
                  className="absolute top-0 left-0"
                  onLoad={() => setTimeout(() => setIsLoading(false), 500)}
                />
                <Skeleton
                  visible={isLoading}
                  w={120}
                  h={120}
                  className="absolute top-0 left-0"
                ></Skeleton>
                <CloseButton
                  pos="absolute"
                  top={5}
                  right={5}
                  size="sm"
                  color="white"
                  className="!bg-black/50"
                  icon={<CloseIcon color="white" />}
                  variant="filled"
                  onClick={() => removeImage(index)}
                />
                {/* <Text
                  size="xs"
                  ta="center"
                  mt={4}
                  c="dimmed"
                  truncate
                  className="!text-text"
                >
                  {selectedImages[index]?.name}
                </Text> */}
              </Box>
            ))}
          </SimpleGrid>
        </Grid.Col>
      )}
    </div>
  );
};

export default ImagePreview;
