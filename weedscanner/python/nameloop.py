def generate_and_print_filenames_on_one_line(start_num=1, end_num=196):
    """
    Generates filenames in the format 'group1-shardXof196'
    with no zero padding for X, and prints them all on a single line.

    Args:
        start_num (int): The starting shard number.
        end_num (int): The ending shard number.
    """
    filenames = []
    for i in range(start_num, end_num + 1):
        filename = f"group1-shard{i}of{end_num}.bin"
        filenames.append(filename)

    # Join all filenames in the list into a single string, separated by a space
    all_filenames_on_one_line = " ".join(filenames)

    print(all_filenames_on_one_line)
    print(f"\nTotal generated filenames: {len(filenames)}")

if __name__ == "__main__":
    # Generate and print filenames from 1 to 196 on one line
    generate_and_print_filenames_on_one_line(1, 196)