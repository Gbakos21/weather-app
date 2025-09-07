# hivatalos nginx image
FROM nginx:alpine

# statikus fájlok bemásolása a containerbe
COPY . /usr/share/nginx/html

# nginx alapértelmezett portja
EXPOSE 80

# nincs szükség CMD-re, az nginx image-ben már be van állítva
