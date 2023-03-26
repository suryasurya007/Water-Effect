import {
  Card,
  Grid,
  TextField,
  CircularProgress,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useEffect } from "react";
import { useState } from "react";
export const Home = () => {
  const [data, SetData] = useState(" ");
  const [loaded, SetLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=${search}&order_by=favorites&sort=desc`
    )
      .then((res) => res.json())
      .then((json) => {
        SetData(json);
        SetLoaded(true);
      });
  }, [page, search]);
  return (
    <Grid
      sx={{
        background:
          "linear-gradient(to right bottom, rgb(151, 25, 43), rgb(39, 85, 144))",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2%",
      }}
    >
      <Grid item color="white" my="4%">
        <h1>Search Anime Characters</h1>
      </Grid>
      <Grid item sx={{ width: "50%" }}>
        <TextField
          fullWidth
          size="small"
          sx={{
            mixBlendMode: "hard-light",
            "& .MuiInputBase-input": {
              background: "white",
              borderRadius: "10px",
            },
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
          }}
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Grid>
      {loaded && (
        <Grid item>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid item>
              <Button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setPage(page + 1);
                }}
                disabled={data.pagination.has_next_page === false}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!loaded && <CircularProgress />}
      {loaded && (
        <Grid
          item
          sx={{ maxHeight: "500px", overflow: "auto", padding: "32px" }}
        >
          {data.data.map((item, index) => {
            return (
              <Card
                key={index}
                sx={{
                  width: "50vw",
                  my: "8px",
                  height: "120px",
                  borderRadius: "10px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item sx={{ mx: "4px", my: "4px", maxWidth: "100px" }}>
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.name}
                      style={{
                        width: "100px",
                        borderRadius: "10px",
                        height: "100px",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid sx={{ textAlign: "center" }}>
                      <Grid item>
                        <Typography>{item.name}</Typography>
                      </Grid>
                      <Grid item>
                        {item.nicknames.map((nick, index) => {
                          return (
                            <Button
                              key={index}
                              variant="contained"
                              sx={{ mx: "2px", my: "2px" }}
                            >
                              {nick}
                            </Button>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ justifySelf: "end", alignSelf: "center" }}>
                    <IconButton
                      size="large"
                      onClick={() => {
                        window.open(item.url);
                      }}
                    >
                      <ArrowRightAltIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </Grid>
      )}
      {loaded && data.data.length === 0 && <h1>No Results found</h1>}
    </Grid>
  );
};
