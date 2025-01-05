#stage deps
FROM  hub.hamdocker.ir/node:20 AS deps
WORKDIR /app
COPY package*.json .env.production ./

RUN npm config set strict-ssl false

RUN npm install -f --verbose
COPY . .
# RUN git config http.sslVerify "false"
RUN git -c http.sslVerify=false clone http://gitlab.com/rastegar_m/papak.git ./node_modules/papak
RUN mv .env.production .env
RUN rm -rf .env.production
RUN npm run build
COPY . .
# RUN yarn --frozen-lockfile --production


#stage runner
FROM  hub.hamdocker.ir/node:20 AS runner
ARG MODE=$MODE
ENV MODE=$MODE


WORKDIR /app
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=deps /app/.env ./.env
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/next.config.mjs ./next.config.mjs
COPY --from=deps /app/public ./public
RUN rm -rf ./.next/cache

# RUN npm install -g sharp
# ENV NEXT_SHARP_PATH ./node_modules/sharp

RUN chown -R nextjs:nodejs ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
