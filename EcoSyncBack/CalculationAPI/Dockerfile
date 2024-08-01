FROM oven/bun:1 as base
WORKDIR /usr/src/app

From base as install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# WARN: Not working because of unknown error in build.

# From base as prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY . .
#
# ENV NODE_ENV=production
# RUN bun run build
#
# FROM base as release
# COPY --from=install /temp/dev/node_modules node_modules
# COPY --from=prerelease /usr/src/app/out out
# COPY --from=prerelease /usr/src/app/package.json package.json
#
# USER bun
# EXPOSE 3000
# CMD ["bun", "run", "out/index.js"]

From base as release
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=install /temp/dev/package.json package.json
COPY src src

CMD ["bun", "run", "start"]
