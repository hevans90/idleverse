#!/usr/bin/env python3.7
import iterm2

working_directory = "idleverse"

# The commands to run
cmd_top_left = "nx serve idleverse-web -c docker"
cmd_bottom_left = "nx run idleverse-game-server:watch"

cmd_top_right = "bun docker-up && bun prepare-watch && bun hasura && bun console"
cmd_middle_right_top = "nx serve colyseus"
cmd_middle_right_bottom = "docker logs -f game-server"
cmd_bottom_right = "bun run generate:docker"


async def main(connection):
    app = await iterm2.async_get_app(connection)
    window = app.current_terminal_window

    if window is not None:
        # Start a new tab
        tab = await window.async_create_tab()
        bottom_left = tab.current_session

        # Split the tab into multiple panes
        top_left = await bottom_left.async_split_pane(vertical=False, before=True)
        top_right = await top_left.async_split_pane(vertical=True)
        bottom_right = await bottom_left.async_split_pane(vertical=True)
        middle_right_top = await top_right.async_split_pane(vertical=False)
        middle_right_bottom = await middle_right_top.async_split_pane(vertical=False)

        # Change directory and run commands on each of the panes
        await bottom_left.async_send_text(f"cd {working_directory}\n{cmd_bottom_left}\n")
        await bottom_right.async_send_text(f"cd {working_directory}\n{cmd_bottom_right}\n")
        await top_left.async_send_text(f"cd {working_directory}\n{cmd_top_left}\n")
        await top_right.async_send_text(f"cd {working_directory}\n{cmd_top_right}\n")
        await middle_right_top.async_send_text(f"cd {working_directory}\n{cmd_middle_right_top}\n")
        await middle_right_bottom.async_send_text(f"cd {working_directory}\n{cmd_middle_right_bottom}\n")

    else:
        # You can view this message in the script console.
        print("No current window")

iterm2.run_until_complete(main)
