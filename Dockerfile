FROM nodesource/trusty
ENV APP_DIR /var/app/current
WORKDIR $APP_DIR

RUN mkdir -p $APP_DIR

# Add package.json before running npm install. Changing package.json should invalidate the cache
ADD ./package.json $APP_DIR
RUN npm install
ADD bin $APP_DIR/bin

EXPOSE 3000
CMD $APP_DIR/bin/start