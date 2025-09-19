import { useMemo } from "react";
import type { MovieDetailType } from "@/types/MovieTypes";

interface SummaryType {
  movie: MovieDetailType;
}
const Summary = ({ movie }: SummaryType) => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="title">Description</div>
        <p className="mt-5 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          tempora quisquam mollitia facilis! Repellat, eius quod quidem incidunt
          dolore velit nesciunt neque aut excepturi voluptate explicabo,
          assumenda, a minus. Repellat quam labore quis blanditiis dignissimos
          beatae ipsam, praesentium nemo omnis, consectetur veniam dolor ex, in
          pariatur non laboriosam dolorum maxime et voluptates perspiciatis
          vitae ipsum! Cum nisi, ad eius tempore quis sit fugiat, minus et
          dolor, est exercitationem voluptatibus amet fugit accusamus?
          Reprehenderit dolorem numquam excepturi ipsam distinctio sequi
          deserunt officiis dolorum quos explicabo cupiditate ratione,
          voluptates illum ullam quo, consectetur facilis nulla? Ipsum rerum,
          numquam, repellat autem, in alias excepturi deleniti facilis eius
          dolore repudiandae iste perferendis consequuntur dicta nemo tempora.
          Cumque ex aperiam ut in doloremque eius magni voluptas recusandae
          delectus laboriosam. Rem, et, sunt quisquam impedit architecto
          molestias excepturi quasi voluptates at quis delectus ad? Distinctio
          ipsum ab, voluptate cum illum vel repellat! Ex voluptatibus illum, a,
          vitae sint nemo in inventore, corporis incidunt voluptatem debitis.
          Cum tempore in inventore quaerat aliquam eligendi dolores vero
          asperiores adipisci similique, praesentium dolorem incidunt facilis
          totam illo, optio veniam cupiditate sequi? Temporibus architecto ipsum
          veniam sunt ut fugiat dolor dicta, consequuntur explicabo facilis fuga
          soluta excepturi praesentium laboriosam ratione nihil?
        </p>
      </div>

      <div>
        <div className="title">Cast</div>
        <div className="flex gap-16 mt-10">
          {useMemo(
            () =>
              movie?.casts?.map((cast) => (
                <div className="text-center" key={cast.id}>
                  <div className="border-2 border-primary inline-block rounded-full p-2">
                    <img
                      src="/movie-bg-10.png"
                      className="rounded-full w-32 h-32 border-4 border-primary"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="text-lg font-semibold">{cast.name}</div>
                    <div className="text-sm text-accent">{cast.role}</div>
                  </div>
                </div>
              )),
            [movie?.casts],
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
