#!/usr/bin/env python3.7
import iterm2

# The commands to run
cmd_top_left="cd idleverse && nx serve idleverse-web -c docker"
cmd_bottom_left = "cd idleverse"

cmd_top_right="cd idleverse && yarn docker-up && yarn prepare-watch && yarn hasura && yarn console"
cmd_middle_right="cd idleverse && nx serve colyseus"
cmd_bottom_right = "cd idleverse && yarn run generate:docker"

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
        
        middle_right = await top_right.async_split_pane(vertical=False)

        # Run commands on each of the panes
        await bottom_left.async_send_text(cmd_bottom_left + '\n')
        await bottom_right.async_send_text(cmd_bottom_right + '\n')
        await top_left.async_send_text(cmd_top_left + '\n')
        await top_right.async_send_text(cmd_top_right + '\n')
        await middle_right.async_send_text(cmd_middle_right + '\n')

    else:
        # You can view this message in the script console.
        print("No current window")

iterm2.run_until_complete(main)