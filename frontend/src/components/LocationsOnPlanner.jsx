import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import MyButton from "./MyButton";
import { AiFillStar } from "react-icons/ai";

const LocationsOnPlanner = ({
  isLoading,
  isError,
  error,
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  setMapCenter,
  setSelectedLocationId,
}) => {
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error: {error}</Box>;
  }

  if (data && data.pages[0].length <= 0) {
    return <Text>Location not found</Text>;
  }

  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      gap="50px"
    >
      {data && (
        <Flex flexDir="column" justifyContent="center" gap="50px">
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((location) => (
                <Flex
                  // as={Link}
                  id="below"
                  key={location.placeId}
                  flexDir={{ base: "column", md: "row" }}
                  borderRadius="20px"
                  overflow="hidden"
                  height={{ base: "fit-content" }}
                  w="full"
                  // to={`${location.id}`}
                >
                  <Box
                    minW="30%"
                    maxW={{ base: "full", md: "30%" }}
                    minH={{ base: "40%", md: "full" }}
                    h="200px"
                  >
                    <Image
                      src={location.photo}
                      height="full"
                      w="full"
                      fallbackSrc="/img_fallback.jpg"
                      fallbackStrategy="onError"
                      referrerPolicy="no-referrer"
                      objectFit="cover"
                    />
                  </Box>
                  <Flex
                    flexGrow="1"
                    color="tripl-new.black"
                    bgColor="tripl-new.cream"
                    px="30px"
                    flexDir="column"
                    gap="10px"
                    py="30px"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "24px", md: "30px" }}
                      textOverflow="ellipsis"
                    >
                      {location.name}
                    </Text>

                    <Flex gap="10px" alignItems="center">
                      <Image
                        src={`/${location.type}-icon.svg`}
                        w="30px"
                        h="30px"
                      />
                      <Flex
                        color="tripl-new.orange"
                        alignItems="center"
                        gap="4px"
                      >
                        <AiFillStar />
                        <Text fontSize="sm" fontWeight="bold">
                          {location.rating}
                        </Text>
                      </Flex>
                      <Text fontSize="sm" fontWeight="medium" color="gray.500">
                        {location.reviewCount} reviews
                      </Text>
                    </Flex>
                    <MyButton
                      onClick={() => {
                        setMapCenter({
                          lat: location.latitude,
                          lng: location.longitude,
                        });
                        setSelectedLocationId(location.id);
                      }}
                      mt={{ md: "20px" }}
                    >
                      Lihat di Map
                    </MyButton>
                  </Flex>
                </Flex>
              ))}
            </React.Fragment>
          ))}
        </Flex>
      )}
      {hasNextPage && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Flex>
  );
};

const LoadMoreButton = ({ fetchNextPage, isFetchingNextPage }) => {
  return (
    <Button
      bgColor="tripl-new.orange"
      color="tripl-new.light"
      transitionDuration="0.2s"
      boxShadow="lg"
      transitionTimingFunction="ease-in-out"
      _hover={{
        transform: "translateY(10%)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      isLoading={isFetchingNextPage}
      loadingText="Loading more..."
    >
      Load More
    </Button>
  );
};

export default LocationsOnPlanner;
