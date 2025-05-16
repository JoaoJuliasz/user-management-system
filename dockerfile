FROM node:18-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.config /etc/nginx/conf.d/default.conf


COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
