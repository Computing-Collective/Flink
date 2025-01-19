
FROM python:3.12 AS builder

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR='/var/cache/pypoetry' \
    POETRY_HOME='/usr/local'

RUN curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /src

COPY pyproject.toml poetry.lock ./

RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --no-root

FROM python:3.12-slim AS runtime

WORKDIR /src

ENV VIRTUAL_ENV=/src/.venv \
    PATH="/src/.venv/bin:$PATH"

COPY --from=builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}
COPY app ./app

CMD ["fastapi", "run", "app/main.py", "--port", "8000"]
